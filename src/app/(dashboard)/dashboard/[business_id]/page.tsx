import WorkspacePage from "@/pages/workspace/Workspace";

type Props={
    params:Promise<{ business_id: string }>;
}

const Workspace = async ({params}: Props) =>{
    const {business_id} = await params;
    
    return (
        <WorkspacePage business_id={business_id}/>
    );
}

export default Workspace;