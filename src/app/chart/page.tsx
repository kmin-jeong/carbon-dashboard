"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPosts } from "@/lib/api";

export default function CarbonDashboard() {
  const [activities, setActivities] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      const posts = await fetchPosts();
      setActivities(posts);
    }

    loadPosts();
  }, []);
  const cards = [
    {
      title: "총 탄소 배출량",
      value: "1,248 tCO₂",
      change: "+12%",
    },
    {
      title: "이번 달 배출량",
      value: "248 tCO₂",
      change: "-4%",
    },
    {
      title: "최대 배출원",
      value: "Electricity",
      change: "62%",
    },
    {
      title: "감축 목표 달성률",
      value: "78%",
      change: "+8%",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", padding: 20 }}>
      {/* Header */}
      <header
        style={{
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a" }}>
            Carbon Dashboard
          </h1>

          <p style={{ marginTop: 8, color: "#64748b" }}>
            ESG & Carbon Accounting Monitoring System
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            borderRadius: 20,
            background: "#0f172a",
            padding: "12px 20px",
            fontSize: 14,
            fontWeight: 600,
            color: "white",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
          }}
        >
          + New Form
        </button>
      </header>

      {/* KPI Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            style={{
              borderRadius: 28,
              background: "white",
              padding: 20,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
                  {card.title}
                </p>

                <h2
                  style={{
                    marginTop: 10,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {card.value}
                </h2>
              </div>

              <div
                style={{
                  borderRadius: 16,
                  background: "#e2e8f0",
                  padding: "8px 12px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#334155",
                }}
              >
                {card.change}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section
        style={{
          marginTop: 32,
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 24,
        }}
      >
        {/* Chart Area */}
        <div
          style={{
            borderRadius: 28,
            background: "white",
            padding: 24,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                Monthly Emissions
              </h2>

              <p style={{ fontSize: 14, color: "#64748b" }}>
                Carbon emissions trend overview
              </p>
            </div>

            <select
              style={{
                borderRadius: 16,
                border: "1px solid #cbd5e1",
                background: "white",
                padding: "10px 16px",
                fontSize: 14,
                outline: "none",
              }}
            >
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>

          {/* Fake Chart UI */}
          <div
            style={{
              height: 340,
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              borderRadius: 20,
              background: "#f8fafc",
              padding: 24,
            }}
          >
            {[40, 72, 55, 90, 68, 110, 80, 120].map((h, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    background: "#1e293b",
                    height: `${h * 2}px`,
                  }}
                />

                <span style={{ fontSize: 12, color: "#64748b" }}>
                  {idx + 1}월
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* ESG Score */}
          <div
            style={{
              borderRadius: 28,
              background: "#0f172a",
              padding: 24,
              color: "white",
              boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
            }}
          >
            <p className="text-sm text-slate-300">ESG SCORE</p>

            <h2 className="mt-3 text-5xl font-bold">82</h2>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-[82%] rounded-full bg-white" />
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Sustainable management performance is improving.
            </p>
          </div>

          {/* Recent Activity */}
          <div
            style={{
              borderRadius: 28,
              background: "white",
              padding: 24,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                Recent Activities
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {activities.length === 0 ? (
                <div
                  style={{
                    padding: 20,
                    borderRadius: 20,
                    background: "#f8fafc",
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: 14,
                  }}
                >
                  아직 제출된 활동 데이터가 없습니다.
                </div>
              ) : (
                activities.map((item) => {
                  let parsedContent;

                  try {
                    parsedContent =
                      typeof item.content === "string"
                        ? JSON.parse(item.content)
                        : item.content;
                  } catch {
                    parsedContent = {
                      description: item.content,
                      amount: "-",
                      unit: "",
                    };
                  }

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
                    >
                      <div>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "6px 10px",
                            borderRadius: 999,
                            background: "#dcfce7",
                            color: "#166534",
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 8,
                          }}
                        >
                          {item.title}
                        </div>

                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#0f172a",
                            margin: 0,
                          }}
                        ></p>

                        <p style={{ fontSize: 14, color: "#64748b" }}>
                          {item.dateTime}
                        </p>
                      </div>

                      <div
                        style={{
                          borderRadius: 16,
                          background: "#e2e8f0",
                          padding: "10px 14px",
                          minWidth: 120,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: "#0f172a",
                            margin: 0,
                          }}
                        >
                          {parsedContent.amount !== "-"
                            ? `${Number(parsedContent.amount).toLocaleString()} ${parsedContent.unit}`
                            : "No Amount"}
                        </p>

                        <p
                          style={{
                            marginTop: 4,
                            fontSize: 12,
                            color: "#64748b",
                          }}
                        >
                          {parsedContent.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
