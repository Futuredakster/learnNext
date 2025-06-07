import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";
import { getUser } from "@/lib/queries/getUser";
import { getAllUsers } from "@/lib/queries/getAllUsers";
import { auth } from "@/auth"
export default async function TicketFormPage({
    searchParams,
}:{
    searchParams: Promise<{[key:string]: string | undefined}>
}) {
    try{
         const session = await auth()
       const {customerId,ticketId} = await searchParams

       if(!customerId && !ticketId){
            return(
            <>
            <h2 className="text-2xl mb-2"> Ticket ID or Customer ID not found</h2>
            <BackButton title="Go Back" variant="default" />
            </>
            )
        }

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
             if(!customer.active){
                 return(
            <>
            <h2 className="text-2xl mb-2"> customer ID #{customerId} is not active</h2>
            <BackButton title="Go Back" variant="default" />
            </>
            )
             }

             console.log(customer)
              if(session?.user) {
            const users = await getUser(session.user.email!);
            const role = users.role;  // first user object or undefined if none found
            console.log('user: ', role)
            const isAdmin = role === 'admin';
            const isManager = role === 'manager';
            if(isAdmin || isManager){
                const allUsers = await getAllUsers();
                const techs = allUsers? allUsers.map(user => ({
                    id: user.email!,
                    description: user.email!,
                })) : [];
                return <TicketForm customer={customer} role={role} techs={techs} />
            }
            else{
             return <TicketForm customer={customer} role={role} />
            }
              }
        }

        if(ticketId){
            const ticket = await getTicket(parseInt(ticketId))
            if(!ticket){
                 return(
            <>
            <h2 className="text-2xl mb-2"> ticket ID #{ticketId} not found</h2>
            <BackButton title="Go Back" variant="default" />
            </>
            )
        }    
             const customer= await getCustomer(ticket.customerId)  
             console.log('ticket: ', ticket)
             console.log('customer: ', customer)
              if(session?.user) {
            const users = await getUser(session.user.email!);
            const role = users.role;  // first user object or undefined if none found
            console.log('user: ', role)
            const isAdmin = role === 'admin';
            const isManager = role === 'manager';
            if(isAdmin || isManager){
                const allUsers = await getAllUsers();
                const techs = allUsers? allUsers.map(user => ({
                    id: user.email!,
                    description: user.email!,
                })) : [];
                return <TicketForm customer={customer} ticket={ticket} role={role} techs={techs} />
            }
            else{
                const isEditable = ticket.tech === session.user.email;
             return <TicketForm customer={customer} ticket={ticket} role={role} isEditable={isEditable} />
            }
              }
        }

    } catch(e) {
        if(e instanceof Error){
            throw e
        }
    }
}