import { z } from "zod";

export const activitySchema = z.object({
  date: z.string().min(1, "일자는 필수입니다"),

  type: z.string().min(1, "활동유형을 선택하세요"),

  description: z.string().min(1, "설명을 입력하세요").max(100, "100자 이하"),
  amount: z.coerce.number().positive("0보다 커야 합니다"),

  unit: z.string().min(1, "단위를 선택하세요"),
});

export type ActivityFormValues = z.infer<typeof activitySchema>;
