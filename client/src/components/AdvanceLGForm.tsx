import { DistributionSchema, TDistribution } from "@/schemas/distribution";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { getAdvanceLG } from "@/api/advance";

const AdvanceLGForm = ({
  dancerId,
  handleCloseForm,
}: {
  dancerId: string;
  handleCloseForm?: () => void;
}) => {
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
      console.log(data);
      console.log(data.amount);
      console.log(data.dancerId);
      console.log(data.distributionDate);
      const response = await getAdvanceLG(
        data.dancerId,
        data.amount,
        data.distributionDate
      );
      if (response && response.response?.data) {
        console.log({ response, message: "Successfully get an advance" });
        if (handleCloseForm) {
          handleCloseForm();
        }
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <div className="w-2/3 lg:w-5/12">
      <Form {...form}>
        <form onClick={form.handleSubmit(onSubmit)} className="relative">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
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
