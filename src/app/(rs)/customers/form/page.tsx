import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import { auth } from "@/auth"
import CustomerForm  from "@/app/(rs)/customers/form/CustomerForm";
import { getUser } from "@/lib/queries/getUser";

export default async function CustomerFormPage ({
    searchParams,
}:{
    searchParams: Promise<{[key:string]: string | undefined}>
}) {
    try{
     const session = await auth()
     const {customerId} = await searchParams
     if(customerId){
        const customer = await getCustomer(parseInt(customerId))
        if(!customer){
            return(
            <>
            <h2 className="text-2xl mb-2"> customer ID #{customerId} not found</h2>
            <BackButton title="Go Back" variant="default" />
            </>
            )
        }
        if(session?.user) {
            const users = await getUser(session.user.email!);
            const role = users.role;  // first user object or undefined if none found
            console.log('user: ', role)
        return <CustomerForm customer={customer} role = {role} />
        }
     } else{
       if(session?.user) {
            const users = await getUser(session.user.email!);
            const role = users.role;  // first user object or undefined if none found
            console.log('user: ', role)
        return <CustomerForm  role = {role} />
       }
     }
    } catch(e) {
        if(e instanceof Error){
            throw e
        }
    }
}