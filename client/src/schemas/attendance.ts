import z from "zod";

export const AttendanceSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  dancerId: z.array(
    z.string().min(1, {
      message: "At least one dancer must be selected.",
    })
  ),
});

export type TAttendance = z.infer<typeof AttendanceSchema>;
