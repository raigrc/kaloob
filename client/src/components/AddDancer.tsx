import { DancerSchema, TDancer } from "@/schemas/dancer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import axios from "@/api/axios";
import { Button } from "./ui/button";
import { useData } from "@/context/DataContext";

const AddDancer = () => {
  // Get refetch function from context
  const { refetchDancers } = useData();

  const dancerForm = useForm<TDancer>({
    resolver: zodResolver(DancerSchema),
    defaultValues: {
      name: "",
    },
  });

  const onAddDancer = async (data: TDancer) => {
    try {
      const response = await axios.post("/dancers", data);
      console.log("Dancer added successfully:", response);

      // Reset form
      dancerForm.reset();

      // 🎯 Refetch dancers to update the list everywhere!
      await refetchDancers();
      console.log("✅ Dancer list refreshed!");
    } catch (error) {
      console.error("Error adding dancer:", error);
    }
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
