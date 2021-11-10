import React from 'react';
import { useLoading, Puff } from '@agney/react-loading';

const Myloader=()=> {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="150" backgroundColor="white"  />,
    
  });

  return (
   
    <section {...containerProps}>
      {indicatorEl} {/* renders only while loading */}
    </section>
  );
}

export default Myloader;