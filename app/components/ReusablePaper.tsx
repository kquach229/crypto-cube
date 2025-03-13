const ReusablePaper = ({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: React.CSSProperties;
}) => {
  return (
    <div className='bg-paper rounded-sm p-5' style={styles}>
      {children}
    </div>
  );
};

export default ReusablePaper;
