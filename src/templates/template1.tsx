"use client";

import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import { TemplateProps } from ".";

Font.register({
  family: "Clash Grotesk",
  src: "/templatefonts/ClashGrotesk-Semibold.ttf",
  fontStyle: "normal",
  fontWeight: "semibold",
});
Font.register({
  family: "Clash Grotesk",
  src: "/templatefonts/ClashGrotesk-Medium.ttf",
  fontStyle: "normal",
  fontWeight: "medium",
});
Font.register({
  family: "Inter",
  src: "/templatefonts/Inter-Regular.ttf",
  fontStyle: "normal",
  fontWeight: "normal",
});
Font.register({
  family: "Inter",
  src: "/templatefonts/Inter-Bold.ttf",
  fontStyle: "normal",
  fontWeight: "bold",
});

const ITable = ({
  rows,
  colSize,
}: {
  rows: Array<{
    cols: (string | number)[];
    bold?: boolean;
  }>;
  colSize?: number[];
}) =>
  rows.map((r, i) => (
    <View
      key={i}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontFamily: r.bold ? "Clash Grotesk" : "Inter",
        fontSize: "12px",
        fontWeight: r.bold ? "bold" : "normal",
        padding: "8px 0",
        borderTop: i == 0 ? "none" : "1px solid #BFBFBF",
      }}
    >
      {r.cols.map((c, j) => (
        <Text
          style={{
            flex: colSize ? `0 0 ${colSize[j]}%` : "1 1 0%",
          }}
          key={j}
        >
          {typeof c === "number" ? c.toFixed(2) : c}
        </Text>
      ))}
    </View>
  ));

export default function Template1(props: TemplateProps) {
  return (
    <Document>
      <Page
        style={{
          borderTop: "12px",
          borderColor: "#9E00FF",
        }}
      >
        <View
          style={{
            padding: "24px",
          }}
        >
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                fontFamily: "Clash Grotesk",
                fontSize: "37px",
                fontWeight: "semibold",
              }}
            >
              <Text
                style={{
                  flex: "1 1 0%",
                }}
              >
                Invoice
              </Text>
              <Text
                style={{
                  opacity: 0.5,
                }}
              >
                #001
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Clash Grotesk",
                  opacity: 0.5,
                }}
              >
                From
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Clash Grotesk",
                  opacity: 0.5,
                }}
              >
                To
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                fontFamily: "Clash Grotesk",
                fontWeight: "medium",
              }}
            >
              <Text style={{ opacity: 0.5 }}>Issued</Text>
              <Text>6/29/2022</Text>
              <Text style={{ opacity: 0.5, marginTop: "6px" }}>Due</Text>
              <Text>8/01/2022</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: "32px",
            }}
          >
            <ITable
              rows={[
                { bold: true, cols: ["Description", "Qty", "Rate", "Amount"] },
                ...props.invoice.lineItems.map((i) => ({
                  cols: [i.description, i.quantity, i.unitPrice, i.total],
                })),
                {
                  bold: true,
                  cols: ["Subtotal", "", "", props.invoice.subtotal],
                },
              ]}
              colSize={[50, 10, 20, 20]}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
}
