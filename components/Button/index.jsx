export default function Button({ children, variant='primary', className='', ...props }) {
  const base = variant === 'outline' ? 'btn-outline' : 'btn-primary';
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
}
