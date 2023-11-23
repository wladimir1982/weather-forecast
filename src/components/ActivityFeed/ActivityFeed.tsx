import React, { useState } from 'react';
import {Box, Button, Input, MenuItem, Select, Typography} from '@mui/material';
import MuiIconButton from '@mui/material/IconButton';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  ChatBubbleOutline,
  FormatListBulletedRounded,
  LocalCafeRounded,
  Person,
  Phone,
  SportsBarRounded
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { IActivityFeed } from '../../interfaces/interfaces';
import data from '../../data/initialActivityFeeds.json';
import { activityFeedTypes, explanatoryText } from '../../constants/activityFeedConstants';

import styles from './ActivityFeed.module.scss';


const ActivityFeed: React.FC = () => {
  const { initialActivityFeeds }: { initialActivityFeeds: IActivityFeed[] } = data;
  const [activityFeeds, setActivityFeeds] = useState<IActivityFeed[]>(initialActivityFeeds);
  const [newActivityFeed, setNewActivityFeed] = useState<IActivityFeed>({
    id: '',
    createdAt: '',
    type: '',
    explanatoryText: '',
    note: ''
  });
  const theme = useTheme();

  const getRandomId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }

    return id;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setNewActivityFeed(prev => {
      const newState: IActivityFeed = { ...prev };
      newState.note = value;
      return newState;
    });
  };

  const onSubmit = () => {
    const timestamp = new Date().toISOString();
    const activityFeed = {
      ...newActivityFeed,
      createdAt: timestamp,
      id: getRandomId()
    };

    setActivityFeeds(prev => [activityFeed, ...prev]);

    setNewActivityFeed({
      id: '',
      createdAt: '',
      type: '',
      explanatoryText: '',
      note: ''
    });
  };

  const deleteActivityFeed = (id: string) => {
    setActivityFeeds(prev => prev.filter(activityFeed => activityFeed.id !== id));
  };

  const setType = (type: string) => {
    setNewActivityFeed(prev => {
      const newState: IActivityFeed = { ...prev };
      newState.type = type;
      newState.explanatoryText = explanatoryText[type];
      return newState;
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'message':
        return <ChatBubbleOutline />;
      case 'coffee':
        return <LocalCafeRounded />;
      case 'meeting':
        return <Person />;
      case 'phone':
        return <Phone />;
      case 'beer':
        return <SportsBarRounded />;
      default:
        return null;
    }
  };

  const getActivityFeeds = () => {
    return activityFeeds.map((activityFeed: IActivityFeed) => {
      const createdAt = new Date(activityFeed.createdAt);
      const timeDifference = Number(Date.now()) - Number(createdAt);
      const daysSinceCreation = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const formattedTime = daysSinceCreation > 0 ? `${daysSinceCreation}d` : createdAt.toLocaleTimeString();

      return (
        <TimelineItem key={activityFeed.id}>
          <TimelineOppositeContent
            sx={{ marginTop: '18px', flex: 0.15 }}
          >
            {formattedTime}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ flexGrow: 0.4 }} />
            <TimelineDot className={styles.timelineDot}>
              {getIcon(activityFeed.type)}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box className={styles.timelineContent}>
              <Box className={styles.timelineBlock}>
                <Box>
                  <Typography className={styles.title} component="h5">
                    You&nbsp;
                    <Typography className={styles.explanatoryText} component="span">
                      {activityFeed.explanatoryText}
                    </Typography>
                    &nbsp;Milton Romaguera
                  </Typography>
                  <Typography className={styles.note}>{activityFeed.note}</Typography>
                </Box>
                <Select
                  className={styles.select}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: theme.palette.primary.main,
                      opacity: '0.2'
                    },
                    '.MuiSvgIcon-root ': {
                      fill: theme.palette.background.default
                    }
                  }}
                >
                  <MenuItem onClick={() => deleteActivityFeed(activityFeed.id)}>
                    Delete
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>
      );
    });
  };

  const renderMuiIconButtons = () => {
    return activityFeedTypes.map((activityFeedType: string) => (
        <MuiIconButton
          className={styles.iconButton}
          key={activityFeedType}
          onClick={() => setType(activityFeedType)}
        >
          {getIcon(activityFeedType)}
        </MuiIconButton>
      )
    );
  };

  return (
    <Box className={styles.container}>
      <Timeline position="right">
        <TimelineItem>
          <TimelineOppositeContent sx={{ flex: 0.15 }}></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ flexGrow: 0.2 }} />
            <TimelineDot className={styles.timelineDot}>
              <FormatListBulletedRounded />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box className={styles.timelineContent}>
              <Input
                classes={{ root: styles.wrapInput, input: styles.input }}
                disableUnderline
                multiline
                onChange={onChange}
                placeholder="Add a note about Milton Romaguera..."
                value={newActivityFeed.note}
                rows={3}
              />
              <Box className={styles.bottomActions}>
                <Box className={styles.wrapIconButtons}>
                  {renderMuiIconButtons()}
                </Box>
                <Button
                  className={styles.submitBtn}
                  variant="contained"
                  onClick={onSubmit}
                  disabled={!newActivityFeed.note || !newActivityFeed.type}
                >Submit</Button>
              </Box>
            </Box>
          </TimelineContent>
        </TimelineItem>
        {
          activityFeeds.length
          ? getActivityFeeds()
          : <Typography className={styles.emptyMsg}>The activity feeds list is empty</Typography>
        }
      </Timeline>
    </Box>
  );
};

export default ActivityFeed;
