import Form from "next/form"
import { Input } from "@/components/ui/input"
import SearchButton from "@/components/SearchButton"
// name in input emphiszies what will be in the query string
// when the form is submitted, so it should match the expected parameter in the route handler
export default function TicketSearch() {
    return (
        <Form
            action="/tickets"
            className="flex gap-2 items-center"
        >
            <Input
                name="searchText"
                type="text"
                placeholder="Search Tickets"
                className="w-full"
            />
            <SearchButton />
        </Form>
    )
}