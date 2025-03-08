import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import UserStats from '@features/Profile/UserStats/UserStats';

export default function UserStatus({ profileStats = {}, onlySmallScreen, isProfileStatsLoading = true }) {
  const DRAFT_PROFILE_STATS = [
    {
      id: 1,
      label: 'Created Categories',
      caption: 'The total number of categories created',
      value: profileStats?.totalCategories,
      color: 'rgb(255, 99, 132)',
    },
    {
      id: 2,
      label: 'Created Maintenance Plans',
      caption: 'The total number of maintenance plans created',
      value: profileStats?.totalMaintenancePlans,
      color: 'rgb(54, 162, 235)',
    },
    {
      id: 3,
      label: 'Created assets',
      caption: 'The total number of assets created',
      value: profileStats?.totalAssets,
      color: 'rgb(255, 205, 86)',
    },
  ];

  const total = DRAFT_PROFILE_STATS.map(({ value }) => value).reduce((acc, el) => acc + el, 0);

  return (
    <>
      <Typography variant="h5" color="text.secondary">
        Profile Stats
      </Typography>
      <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
      <Stack
        direction={onlySmallScreen ? 'column' : 'row'}
        justifyContent={'space-between'}
        useFlexGap
        flexWrap="wrap"
        spacing={2}
      >
        {DRAFT_PROFILE_STATS.map((v) => (
          <Stack key={v.id} alignItems={'center'} spacing={0}>
            <Typography variant="subtitle2" color="text.secondary">
              {v.label}
            </Typography>
            <Typography variant="h5" color="text.secondary">
              {v.value}
            </Typography>
            {isProfileStatsLoading ? (
              <Skeleton width="2rem" height="2rem" />
            ) : (
              <UserStats label={v.label} value={v.value} color={v.color} total={total} />
            )}
          </Stack>
        ))}
      </Stack>
    </>
  );
}
