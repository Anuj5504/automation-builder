import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon } from "lucide-react";
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';


type Props = {}

const Navbar = async (props: Props) => {

    const authUser=await currentUser();
   

    let user=null;
    if(authUser) user = await db.user.findUnique({where:{clerkId:authUser.id}});

    return (
        <header className='rounded-4xl m-auto mt-5 w-[80vw] fixed left-0 top-0 right-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between'>
            <aside className='flex items-center gap-[2px]'>
                <p className='text-3xl font-bold'></p>
                <Link href={'/'}>

                <Image
                    src={"/logo.webp"}
                    width={30}
                    height={30}
                    alt="AB logo"
                    className='shadow-sm rounded-full'
                    />
                </Link>
            </aside>
            <nav className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
                <ul className='flex items-center gap-4 list-none'>
                    <li>
                        <Link href="#">Products</Link>
                    </li>
                    <li>
                        <Link href="#">Pricing</Link>
                    </li>
                    <li>
                        <Link href="#">Clients</Link>
                    </li>
                    <li>
                        <Link href="#">Resources</Link>
                    </li>
                    <li>
                        <Link href="#">Documentation</Link>
                    </li>
                    <li>
                        <Link href="#">Enterprise</Link>
                    </li>
                </ul>
            </nav>
            <aside className="flex items-center gap-4">
                <Link
                    href={`${user ?'/dashboard':'/sign-in' }`}
                    className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        {user ? 'Dashboard' : 'Get Started'}
                    </span>
                </Link>
                {user ? <UserButton afterSignOutUrl="/" /> : null}
                <MenuIcon className="md:hidden" />
            </aside>
        </header>
    )
}

export default Navbar