import { DistributionSchema, TDistribution } from "@/schemas/distribution";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { getAdvanceLG } from "@/api/advance";
import { useData } from "@/context/DataContext";

const AdvanceLGForm = ({
  dancerId,
  handleCloseForm,
}: {
  dancerId: string;
  handleCloseForm?: () => void;
}) => {
  // Get refetch function from context
  const { refetchAll } = useData();
  const form = useForm<TDistribution>({
    resolver: zodResolver(DistributionSchema),
    defaultValues: {
      dancerId: dancerId,
      amount: 0,
      distributionDate: new Date(),
    },
  });

  const onSubmit = async (data: TDistribution) => {
    try {
      console.log("📤 Submitting advance:", data);

      const response = await getAdvanceLG(
        data.dancerId,
        data.amount,
        data.distributionDate,
      );

      console.log("📥 Response from getAdvanceLG:", response);

      // Check if the operation was successful
      if (response) {
        console.log("✅ Advance successful!");

        // 🎯 ALWAYS refetch data to update the UI
        console.log("🔄 Refetching all data...");
        await refetchAll();
        console.log("✅ Balance updated after advance!");

        // Close the form
        if (handleCloseForm) {
          handleCloseForm();
        }
      } else {
        console.error("❌ No response from getAdvanceLG - operation may have failed");
        alert("Failed to process advance. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error in advance form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <div className="w-2/3 lg:w-5/12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter amount"
                    min="0"
                    step="1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="absolute rounded-full right-1 top-1 size-7"
            variant="secondary"
            type="submit"
          >
            <Check />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AdvanceLGForm;
