const BackgroundDecoration = () => {
  return (
    <>
      <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 right-20 w-96 h-96 bg-brand-blush/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-20 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-brand-sky/15 rounded-full blur-3xl'></div>
      </div>
    </>
  );
};
export default BackgroundDecoration;
