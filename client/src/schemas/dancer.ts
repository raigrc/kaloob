import z from "zod";

const AttendanceSchema = z.object({
  name: z.array(
    z.string().min(1, {
      message: "At least one dancer must be selected.",
    })
  ),
});

const DancerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type TAttendance = z.infer<typeof AttendanceSchema>;
type TDancer = z.infer<typeof DancerSchema>;

export { AttendanceSchema, DancerSchema };
export type { TAttendance, TDancer };
