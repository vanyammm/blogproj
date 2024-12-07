import './Skeleton.scss'

export const Skeleton = ({currentPage}) => {
    console.log('skeleton');
    return (
        <div className='skeleton'>
            {Array.from({ length: 10 }).map((_, index) => {
                return (
                <div key={index} className='post-skeleton'>
                    {/* <div className='span-skeleton'></div> */}
                    <div className='picture-skeleton'></div>
                    <div className='post-main-skeleton'>
                    </div>
                </div>
                );
            })}
        </div>
    );
};