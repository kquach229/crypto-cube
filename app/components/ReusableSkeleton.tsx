import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <div>
      <Skeleton className='h-[200] w-auto' />
      <div>
        <Skeleton className='w-5' />
      </div>
    </div>
  );
}
