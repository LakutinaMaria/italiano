import React, { useState, useEffect } from 'react';
import { CourseProgress, UserCourse, courseService } from '../services/courseService';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  School,
  Schedule,
  TrendingUp,
  CheckCircle,
  PlayCircle,
  Timer
} from '@mui/icons-material';

interface ProgressDashboardProps {
  userId: string;
  userCourse: UserCourse;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userId, userCourse }) => {
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [userId, userCourse.courseId]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      // For now, create dummy progress data since the API might not be fully implemented
      const dummyProgress: CourseProgress = {
        courseId: userCourse.courseId,
        courseName: userCourse.course?.name || 'Unknown Course',
        completedLessons: userCourse.completedLessons || 0,
        totalLessons: userCourse.totalLessons || 1,
        progressPercentage: Math.round(((userCourse.completedLessons || 0) / (userCourse.totalLessons || 1)) * 100),
        timeSpent: Math.floor(Math.random() * 180) + 60, // Random time between 60-240 minutes
        lastStudiedAt: userCourse.lastAccessedAt
      };
      setProgress(dummyProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || !progress) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading progress...</Typography>
      </Box>
    );
  }

  // Dummy achievement data
  const achievements = [
    { id: 1, title: 'First Lesson Completed', icon: '🎯', earned: true },
    { id: 2, title: 'Week Streak', icon: '🔥', earned: true },
    { id: 3, title: 'Vocabulary Master', icon: '📚', earned: false },
    { id: 4, title: 'Grammar Expert', icon: '✍️', earned: false }
  ];

  // Dummy recent activity
  const recentActivities = [
    { id: 1, action: 'Completed lesson "Basic Greetings"', time: '2 hours ago', type: 'lesson' },
    { id: 2, action: 'Practiced vocabulary set', time: '1 day ago', type: 'practice' },
    { id: 3, action: 'Completed quiz "Numbers 1-20"', time: '2 days ago', type: 'quiz' }
  ];

  return (
    <Box sx={{ mt: 10, pt: 4 }}>
      <Box display="flex" gap={3} sx={{ height: '500px' }}>
        {/* Course Overview */}
        <Card sx={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  {progress.courseName}
                </Typography>
                <Chip
                  label={userCourse.course?.level || 'Unknown'}
                  color="primary"
                  size="small"
                  sx={{ textTransform: 'capitalize', fontFamily: 'Poppins, sans-serif' }}
                />
              </Box>
              <Box textAlign="right">
                <Typography variant="h4" color="primary" fontWeight="bold" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  {progress.progressPercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  Complete
                </Typography>
              </Box>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress.progressPercentage}
              sx={{ height: 8, borderRadius: 4, mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                {progress.completedLessons} of {progress.totalLessons} lessons completed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                Last studied: {formatDate(progress.lastStudiedAt)}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-around" alignItems="center" sx={{ py: 2, flex: 1 }}>
              <Box textAlign="center">
                <Box display="flex" justifyContent="center" mb={1}>
                  <CheckCircle color="success" />
                </Box>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>{progress.completedLessons}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  Completed
                </Typography>
              </Box>

              <Box textAlign="center">
                <Box display="flex" justifyContent="center" mb={1}>
                  <Timer color="primary" />
                </Box>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>{formatTime(progress.timeSpent)}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  Time Spent
                </Typography>
              </Box>

              <Box textAlign="center">
                <Box display="flex" justifyContent="center" mb={1}>
                  <PlayCircle color="info" />
                </Box>
                <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  {progress.totalLessons - progress.completedLessons}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                  Remaining
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Recent Activity
            </Typography>
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {activity.type === 'lesson' ? <School /> :
                         activity.type === 'practice' ? <TrendingUp /> :
                         <CheckCircle />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.60)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Achievements
            </Typography>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {achievements.map((achievement) => (
                <Box
                  key={achievement.id}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={2}
                  p={1}
                  sx={{
                    borderRadius: 1,
                    bgcolor: achievement.earned ? 'success.light' : 'grey.100',
                    opacity: achievement.earned ? 1 : 0.6
                  }}
                >
                  <Typography variant="h6">{achievement.icon}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: achievement.earned ? 'success.dark' : 'text.secondary',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    {achievement.title}
                  </Typography>
                  {achievement.earned && (
                    <CheckCircle color="success" fontSize="small" />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProgressDashboard;