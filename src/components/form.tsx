"use client";

import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { activitySchema, ActivityFormValues } from "@/lib/formValidation";
import { UNIT_OPTIONS } from "@/type/unit";
import { createOrUpdatePost } from "@/lib/api";

export default function ActivityForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema) as any,
    mode: "onChange",
  });

  const selectedType = watch("type");

  const selectedActivity = useMemo(() => {
    return UNIT_OPTIONS.find((a) => a.value === selectedType);
  }, [selectedType]);

  const onSubmit: SubmitHandler<ActivityFormValues> = async (data) => {
    try {
      setIsSubmitting(true);

      await createOrUpdatePost({
        title: data.type,
        resourceUid: data.unit,
        dateTime: data.date,

        content: JSON.stringify({
          description: data.description,
          amount: data.amount,
          unit: data.unit,
        }),
      });

      reset();

      router.push("/chart");

      router.refresh();
    } catch (err) {
      console.error(err);

      alert("저장 실패");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: 40,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: 460,
          margin: "0 auto",
          background: "white",
          borderRadius: 32,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <h1
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: 8,
            }}
          >
            Carbon Activity Form
          </h1>

          <p
            style={{
              fontSize: 14,
              color: "#64748b",
            }}
          >
            ESG 탄소 활동 데이터를 입력해주세요.
          </p>
        </div>

        {/* 날짜 */}
        <div>
          <label style={labelStyle}>날짜</label>

          <input type="date" {...register("date")} style={inputStyle} />

          <p style={errorStyle}>{errors.date?.message}</p>
        </div>

        <div>
          <label style={labelStyle}>활동 유형</label>

          <select
            {...register("type")}
            style={inputStyle}
            onChange={(e) => {
              setValue("type", e.target.value);
              setValue("unit", "");
            }}
          >
            <option value="">선택</option>

            {UNIT_OPTIONS.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>

          <p style={errorStyle}>{errors.type?.message}</p>
        </div>

        <div>
          <label style={labelStyle}>설명</label>

          <input
            placeholder="활동 설명 입력"
            {...register("description")}
            style={inputStyle}
          />

          <p style={errorStyle}>{errors.description?.message}</p>
        </div>

        <div>
          <label style={labelStyle}>탄소 배출량</label>

          <input
            type="number"
            placeholder="예: 2000"
            {...register("amount", {
              valueAsNumber: true,
            })}
            style={inputStyle}
          />

          <p style={errorStyle}>{errors.amount?.message}</p>
        </div>

        <div>
          <label style={labelStyle}>단위</label>

          <select {...register("unit")} style={inputStyle}>
            <option value="">선택</option>

            {selectedActivity?.units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <p style={errorStyle}>{errors.unit?.message}</p>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={{
            marginTop: 10,
            padding: 16,
            borderRadius: 18,
            border: "none",

            background: isValid && !isSubmitting ? "#0f172a" : "#94a3b8",

            color: "white",
            fontSize: 15,
            fontWeight: 700,

            cursor: isValid && !isSubmitting ? "pointer" : "not-allowed",

            transition: "0.2s",
          }}
        >
          {isSubmitting ? "저장중..." : "제출하기"}
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontSize: 14,
  fontWeight: 600,
  color: "#334155",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 18,
  border: "1px solid #cbd5e1",

  background: "#f8fafc",

  fontSize: 14,

  outline: "none",

  boxSizing: "border-box",
};

const errorStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: 12,
  marginTop: 6,
};
