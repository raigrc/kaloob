import { AttendanceSchema, TAttendance } from "@/schemas/attendance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { IAttendance } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ToggleButton } from "./ui/ToggleButton";
import axios from "@/api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { CirclePlus } from "lucide-react";
import AddDancer from "./AddDancer";
import { useData } from "@/context/DataContext";

const AttendanceForm = () => {
  // Get dancers from context instead of local state
  const { dancers, refetchAll } = useData();

  const form = useForm<TAttendance>({
    resolver: zodResolver(AttendanceSchema),
    defaultValues: {
      dancerId: [],
    },
  });

  const onSubmit = async (data: IAttendance) => {
    try {
      const specialNames = ["Trixie", "Gwen", "Zach"];

      const selectedDancers = dancers.filter((dancer) =>
        data.dancerId.includes(dancer._id)
      );

      const totalLGCollected = selectedDancers.reduce((total, dancer) => {
        const earning = specialNames.includes(dancer.name) ? 100 : 50;
        return total + earning;
      }, 0);

      const totalDancers = data.dancerId.length;

      const serviceResponse = await axios.post("/services", {
        date: data.date.toISOString(),
        totalDancers,
        totalLGCollected,
      });

      console.log("Service added successfully:", serviceResponse);

      const serviceId = serviceResponse.data.newService._id;

      const attendanceResponses = await Promise.all(
        data.dancerId.map(async (dancerId) => {
          const dancer = dancers.find((d) => d._id === dancerId);
          const isSpecial = dancer && specialNames.includes(dancer.name);
          const earningAmount = isSpecial ? 100 : 50;

          await axios.post("/attendance", {
            dancerId,
            serviceId,
            amount: earningAmount,
          });
          // Fetch current totalEarnings for the dancer
          const balanceRes = await axios.get(`/lgbalance/${dancerId}`);
          const currentEarnings = balanceRes.data?.totalEarnings || 0;
          const currentDistributions = balanceRes.data?.totalDistributions || 0;
          const currentBalance = balanceRes.data?.currentBalance || 0;

          await axios.put(`/lgbalance/${dancerId}`, {
            dancerId,
            totalEarnings: currentEarnings + earningAmount,
            totalDistributions: currentDistributions,
            currentBalance: currentBalance + earningAmount,
          });
        })
      );
      console.log("Attendance submission results:", attendanceResponses);

      // Reset form
      form.reset();

      // 🎯 IMPORTANT: Refetch all data to update the dashboard!
      await refetchAll();

      console.log("✅ Dashboard data refreshed!");
    } catch (error) {
      console.error("Error submitting attendance (overall):", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between w-full h-full gap-6 font-dity"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormItem className="flex flex-col items-center">
                <FormLabel className="text-2xl tracking-wider">
                  DATE
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`${
                          !field.value ? "text-primary" : ""
                        } w-full text-lg`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>MM/DD/YYYY</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      // disabled={(date) => date < new Date()}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center h-full gap-4 p-4">
          <h2 className="text-2xl tracking-wider">DANCERS</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {dancers.map((dancer) => (
              <FormField
                key={dancer._id}
                control={form.control}
                name="dancerId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleButton
                        className="w-32 tracking-wider uppercase lg:w-full text-md"
                        checked={field.value.includes(dancer._id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, dancer._id])
                            : field.onChange(
                                field.value.filter((id) => id !== dancer._id)
                              );
                        }}
                      >
                        {dancer.name}
                      </ToggleButton>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full bg-muted group"
                  type="button"
                >
                  <CirclePlus className="stroke-primary group-hover:stroke-accent" />
                </Button>
              </DialogTrigger>
              <DialogContent className="text-primary font-dity">
                <DialogHeader>
                  <DialogTitle className="tracking-wide ">
                    ADD NEW DANCER
                  </DialogTitle>
                </DialogHeader>
                <AddDancer />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Button type="submit" className="text-lg tracking-wider">
          ADD ATTENDANCE
        </Button>
      </form>
    </Form>
  );
};

export default AttendanceForm;
