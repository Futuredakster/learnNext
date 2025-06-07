import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike,or } from "drizzle-orm";

export async function getCustomerSearchResults(searchText: string) {
  const isSpace = searchText.includes(" ");
  const suba = "";
  const subb=""
  if (isSpace) {
    const [suba, subb] = searchText.split(" ");
    const results = await db.select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${suba}%`),
        ilike(customers.lastName, `%${subb}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`),
      ) )
      return results;
  }
  const results = await db.select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.state, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`),
      ) )

  return results;
}