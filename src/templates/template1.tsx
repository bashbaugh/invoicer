"use client";

import { Document, Page, Text, View, Font, Link } from "@react-pdf/renderer";
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
    subitems?: {
      text: string;
      tags?: string[];
    }[];
    bold?: boolean;
  }>;
  colSize?: number[];
}) =>
  rows.map((r, i) => (
    <View
      key={i}
      wrap={false}
      style={{
        padding: "8px 0",
        fontFamily: r.bold ? "Clash Grotesk" : "Inter",
        fontSize: "12px",
        borderTop: i == 0 ? "none" : "1px solid #BFBFBF",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          fontWeight: r.bold ? "bold" : "normal",
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

      {r.subitems && (
        <View
          style={{
            marginTop: "4px",
          }}
        >
          {r.subitems.map((t, j) => (
            <View
              key={j}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                  marginLeft: "16px",
                }}
              >
                {t.text}
              </Text>

              {t.tags?.map((tag) => (
                <Text
                  key={tag}
                  style={{
                    padding: "1px 3px",
                    borderRadius: "4px",
                    backgroundColor: "#DDBDF1",
                    fontSize: "8px",
                  }}
                >
                  {tag}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  ));

export default function Template1(props: TemplateProps) {
  console.log(props.invoice);

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
                {props.invoice.invoiceNumber}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Clash Grotesk",
                fontSize: "14px",
                marginTop: "-8px",
              }}
            >
              {props.invoice.invoiceSubtitle}
            </Text>
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
              <View
                style={{
                  fontFamily: "Inter",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.invoice.from.name}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {props.invoice.from.contactDetails}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Clash Grotesk",
                  opacity: 0.5,
                }}
              >
                Bill To
              </Text>
              <View
                style={{
                  fontFamily: "Inter",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.invoice.recipient.name}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                  }}
                >
                  {props.invoice.recipient.contactDetails}
                </Text>
              </View>
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
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {props.invoice.issueDate}
              </Text>
              <Text style={{ opacity: 0.5, marginTop: "6px" }}>Due</Text>
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                }}
              >
                {props.invoice.dueDate}
              </Text>
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
                  subitems: i.subitems,
                })),
                {
                  bold: true,
                  cols: ["Subtotal", "", "", props.invoice.subtotal],
                },
              ]}
              colSize={[50, 10, 20, 20]}
            />
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "24px",
              gap: "48px",
            }}
          >
            <View
              style={{
                flex: "1 1 0%",
                fontFamily: "Inter",
                fontSize: "12px",
              }}
            >
              {props.invoice.paymentDetails && (
                <>
                  <Text
                    style={{
                      fontFamily: "Clash Grotesk",
                    }}
                  >
                    Payment
                  </Text>
                  <Text>{props.invoice.paymentDetails}</Text>
                </>
              )}
            </View>
            <Text
              style={{
                fontSize: "24px",
              }}
            >
              Total {props.invoice.total}
            </Text>
          </View>

          <Text
            style={{
              marginTop: "24px",
              opacity: 0.6,
              fontFamily: "Inter",
              fontSize: "12px",
            }}
          >
            {props.invoice.note}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
