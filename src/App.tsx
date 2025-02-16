import * as React from 'react';
import { TourProvider } from '@reactour/tour';
import DEFAULT_TOUR_STEPS from '@utils/TourSteps';
import { router } from '@utils/Router';
import { RouterProvider } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <TourProvider steps={DEFAULT_TOUR_STEPS}>
      <React.Suspense
        fallback={
          <div>Loading...</div>
        }
      >
        <RouterProvider router={router} />
      </React.Suspense>
    </TourProvider>
  )
};

export default App;
