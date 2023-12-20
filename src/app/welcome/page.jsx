import Link from 'next/link';

const Welcome = () => {
 return (
   <div className='h-screen w-screen grid font-space-mono place-items-center bg-blue-90'>
     <div className='grid gap-4 md:gap-8 m-2 md:m-6'>
       <div className='grid gap-6 place-items-center'>
         <h1 className='text-3xl font-orbitron font-bold p-4 text-white'>Contemeleon</h1>
         <p className='text-sm md:text-xl leading-6 font-thin tracking-wider text-gray-30'>
           What do you want to do?
         </p>
       </div>
       <div className='bg-gray-30 bg-opacity-30 px-8 py-4 text-white flex items-center justify-center text-xs md:text-base'>
         <Link href='/create' className=''>
           Convert My Content
         </Link>
       </div>
       <div className='bg-blue-20 px-8 py-4 text-white flex items-center justify-center text-xs md:text-base'>
         <Link href='/welcome/dashboard' className='text-center'>
           View Profile
         </Link>
       </div>
     </div>
   </div>
 );
};

export default Welcome;
