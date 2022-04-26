import { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, Button } from "react-native";
import { DataTable } from "react-native-paper";
import { Typography } from '../../styles/index.js';
import invoiceModel from "../../models/invoices";
import Invoice from "../../interface/invoice";

export default function ViewInvoices({ route, navigation }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices())
        route.params = false;
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const listOfInvoices = allInvoices
        .map((invoice: Invoice, index) => {
            return <DataTable.Row key={index}>
                        <DataTable.Cell style={styles.customer} onPress={() => navigation.navigate(
                                            'Visa faktura', {
                                            invoice: invoice
                                            })}>{invoice.name}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 2}}>{invoice.total_price}:-</DataTable.Cell>
                    </DataTable.Row>
        });

    return (
        <ScrollView style={Typography.main}>
            <Text style={Typography.h1}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Kund</DataTable.Title>
                    <DataTable.Title numeric>Summa</DataTable.Title>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>
            <Button
                title='Skapa faktura'
                onPress={() => navigation.navigate('Skapa faktura')}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    customer: {
        flex: 11,
        color: 'blue'
    }
});
