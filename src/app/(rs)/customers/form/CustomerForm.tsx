"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { toast } from 'sonner'
import { insertCustomerSchema, type insertCustomerSchemaType, type selectCustomerSchemaType } from "@/zod-schemas/customer"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"
import { StatesArray } from "@/constants/StatesArray"
import {useAction} from "next-safe-action/hooks"
import { saveCustomerAction } from "@/app/actions/saveCustomerActions"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
    customer?: selectCustomerSchemaType,
    role?: string,
}

export default function CustomerForm({ customer,role }: Props) {
  const isAdmin = role === 'admin';
  const isManager = role === 'manager';
    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? '',
        lastName: customer?.lastName ?? '',
        address1: customer?.address1 ?? '',
        address2: customer?.address2 ?? '',
        city: customer?.city ?? '',
        state: customer?.state ?? '',
        zip: customer?.zip ?? '',
        phone: customer?.phone ?? '',
        email: customer?.email ?? '',
        notes: customer?.notes ?? '',
        active: customer?.active ?? true,
    }

    const form = useForm<insertCustomerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    })

    const{
      execute: executeSave,
      result: saveResult,
      isExecuting: isSaving,
      reset: resetSaveAction,
    } = useAction(saveCustomerAction, {
       onSuccess({data}){
       toast("Success!", {
     description: data?.message,
      });
       },
       onError({error}){
        toast.error("Something went wrong!", {
        description: "Save Failed.",
     });
       }
    })

    async function submitForm(data: insertCustomerSchemaType) {
       // console.log(data)
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer {customer?.id ? `# ${customer.id}` : "Form"}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="First Name"
                        nameInSchema="firstName"
                    />
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Last Name"
                        nameInSchema="lastName"
                    />
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Address 1"
                        nameInSchema="address1"
                    />
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Address 2"
                        nameInSchema="address2"
                    />
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="City"
                        nameInSchema="city"
                    />
                    <SelectWithLabel<insertCustomerSchemaType>
                        fieldTitle="State"
                        nameInSchema="state"
                        data={StatesArray}
                        />
                  </div>

                   <div className="flex flex-col gap-4 w-full max-w-xs">
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Zip Code"
                        nameInSchema="zip"
                    />
                  <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Email"
                        nameInSchema="email"
                        />
                    <InputWithLabel<insertCustomerSchemaType>
                        fieldTitle="Phone"
                        nameInSchema="phone"
                        />
                    <TextAreaWithLabel<insertCustomerSchemaType>
                        fieldTitle="Notes"
                        nameInSchema="notes"
                        className="h-40"
                        />
                        { isAdmin || isManager ? (
                        <CheckboxWithLabel<insertCustomerSchemaType>
                            fieldTitle="Active"
                            nameInSchema="active"
                            message="Yes"
                        />) : null }
                        <div className="flex gap_2">
                          <Button
                            type="submit"
                            className="w-3/4"
                            variant="default"
                            title="Save"
                            disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                <LoaderCircle className="animate-spin" /> Saving
                                </>
                              ) : "Save"}
                            </Button>
                           <Button
                            type="button"
                            variant="destructive"
                            title="Reset"
                            onClick={() => {
                            form.reset(defaultValues)
                            resetSaveAction()
                            }}
                            >Reset
                            </Button>
                        </div>
                   </div>

                </form>
            </Form>

        </div>
    )
}