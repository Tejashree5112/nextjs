export default function HomeLayout({
    children,
}:{
    children: React.ReactNode
}){
    return(
        <div className="flex-1 flex flex-col">
            {children}
        </div>
    );
}