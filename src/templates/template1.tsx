import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { TemplateProps } from ".";

export default function Template1(props: TemplateProps) {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.main}>
          <Text>Invoice</Text>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  body: {
    borderTop: "12px",
    borderColor: "#9E00FF",
  },
  main: {
    padding: "14px",
  },
});
