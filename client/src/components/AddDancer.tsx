import { DancerSchema, TDancer } from "@/schemas/dancer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import axios from "@/api/axios";
import { Button } from "./ui/button";

const AddDancer = () => {
  const dancerForm = useForm<TDancer>({
    resolver: zodResolver(DancerSchema),
    defaultValues: {
      name: "",
    },
  });

  const onAddDancer = (data: TDancer) => {
    try {
      const response = axios.post("/dancers", data);
      console.log("Dancer added successfully:", response);
      dancerForm.reset();
    } catch (error) {
      console.error("Error adding dancer:", error);
    }
    console.log(data);
  };

  return (
    <Form {...dancerForm}>
      <form
        onSubmit={dancerForm.handleSubmit(onAddDancer)}
        className="flex flex-col w-full gap-4"
      >
        <FormField
          control={dancerForm.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full gap-4">
              <FormControl>
                <Input
                  placeholder="Enter dancer's name"
                  {...field}
                  className="w-full"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Add Dancer</Button>
      </form>
    </Form>
  );
};

export default AddDancer;
