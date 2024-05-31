import {motion} from 'framer-motion'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const ActionBar = () => {
    return (
        <div className='flex max-w-4xl mt-5 flex-row w-full bg-stone-900 rounded-lg items-center px-5 py-3 justify-between'>
        <motion.div initial={{ x: "0%" }}
        animate={{ color: "white",
        x: 10,
        y: 10,
        opacity: 1,
        rotate: 360,
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
    }}>
      <p>
        Your Text Goes Here
      </p>
    </motion.div>
        <div className="flex h-7 items-center space-x-4 text-sm">
        <Separator className='bg-stone-600' orientation="vertical" />
        <Button className="bg-teal-500 border-2 border-teal-600 text-background hover:bg-cyan-500" size={'sm'}>Dashboard</Button>
      </div>
            
      </div>
    );
}

export default ActionBar;