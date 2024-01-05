

const Logo = () => {
    return <div className="flex gap-4 justify-start items-center">
        <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg"><g fill="#635FC7" fill-rule="evenodd"><rect width="6" height="25" rx="2"/><rect opacity=".75" x="9" width="6" height="25" rx="2"/><rect opacity=".5" x="18" width="6" height="25" rx="2"/></g></svg>
        <h1 className='text-[26px] text-veryDarkGray dark:text-white hidden sm:block font-bold'>kanban</h1>
    </div>
}

export default Logo