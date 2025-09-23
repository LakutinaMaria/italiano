import React, { useState, useEffect } from 'react';
import { Course, courseService } from '../services/courseService';
import { Card, CardContent, CardActions, Button, Typography, Box, Grid, Chip, CircularProgress } from '@mui/material';
import { School, Schedule, TrendingUp } from '@mui/icons-material';
import { toast } from 'react-toastify';

interface CourseListProps {
  userId: string;
  onCourseSelected: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ userId, onCourseSelected }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const allCourses = await courseService.getAllCourses();
      setCourses(allCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollCourse = async (courseId: string) => {
    try {
      setEnrollingCourseId(courseId);
      await courseService.assignCourse(userId, courseId);
      toast.success('Successfully enrolled in course!');
      onCourseSelected(courseId);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error('Failed to enroll in course');
    } finally {
      setEnrollingCourseId(null);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  const groupedCourses = courses.reduce((acc, course) => {
    if (!acc[course.level]) {
      acc[course.level] = [];
    }
    acc[course.level].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const levelOrder = ['beginner', 'intermediate', 'advanced'];
  const sortedLevels = Object.keys(groupedCourses).sort((a, b) => {
    const aIndex = levelOrder.indexOf(a.toLowerCase());
    const bIndex = levelOrder.indexOf(b.toLowerCase());
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  return (
    <Box sx={{ mt: 10, pt: 4 }}>
      {sortedLevels.map((level) => (
        <Box key={level} sx={{ mb: 4, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Box sx={{ flex: 1 }} />

          <Typography
            variant="h5"
            sx={{
              minWidth: 120,
              textTransform: 'capitalize',
              fontWeight: 600,
              pt: 1,
              pb: 1,
              px: 2,
              fontFamily: 'Poppins, sans-serif',
              backgroundColor: 'rgba(255, 255, 255, 0.60)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              textAlign: 'center'
            }}
          >
            {level} Level
          </Typography>

          <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start', pl: 3 }}>
            {groupedCourses[level].map((course) => (
              <Card
                key={course.id}
                sx={{
                  height: 120,
                  width: '100%',
                  maxWidth: 700,
                  display: 'flex',
                  flexDirection: 'row',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  backgroundColor: 'rgba(255, 255, 255, 0.60)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  }
                }}
              >

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif' }}>
                        {course.name}
                      </Typography>
                      <Box sx={{ minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}>
                        <Chip
                          label={course.active ? 'Active' : 'Inactive'}
                          color={course.active ? 'success' : 'default'}
                          variant={course.active ? 'filled' : 'outlined'}
                          size="small"
                          sx={{
                            mr: course.active ? 0 : 1.5
                          }}
                        />
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleEnrollCourse(course.id)}
                      disabled={enrollingCourseId === course.id || !course.active}
                      startIcon={enrollingCourseId === course.id ? <CircularProgress size={16} /> : <TrendingUp />}
                      sx={{ minHeight: 40, minWidth: 140, fontFamily: 'Poppins, sans-serif' }}
                    >
                      {enrollingCourseId === course.id ? 'Enrolling...' :
                       !course.active ? 'Unavailable' : 'Start Course'}
                    </Button>
                  </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {courses.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No courses available at the moment
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CourseList;