import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { UserCourse, courseService } from "../../../services/courseService";
import CourseList from "../../CourseList";
import ProgressDashboard from "../../ProgressDashboard";
import { toast } from 'react-toastify';
import UserService from "../../../services/userServices";

export const HomePage = () => {
  const [userCourse, setUserCourse] = useState<UserCourse | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the real user ID from Keycloak
  const userId = UserService.getUserId();

  useEffect(() => {
    checkUserCourse();
  }, []);

  const checkUserCourse = async () => {
    try {
      setLoading(true);
      const activeCourse = await courseService.getUserActiveCourse(userId);
      setUserCourse(activeCourse);
    } catch (error) {
      console.error('Error checking user course:', error);
      toast.error('Failed to load course information');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelected = (courseId: string) => {
    // Refresh the user course data after selection
    checkUserCourse();
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          Loading...
        </Box>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: 'none',
        py: 4,
        px: 4,
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}
    >
      {userCourse ? (
        <ProgressDashboard userId={userId} userCourse={userCourse} />
      ) : (
        <CourseList userId={userId} onCourseSelected={handleCourseSelected} />
      )}
    </Box>
  );
};
