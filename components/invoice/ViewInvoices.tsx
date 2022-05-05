import { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { Typography, Base } from '../../styles/index.js';
import invoiceModel from "../../models/invoices";
import Invoice from "../../interface/invoice";

export default function ViewInvoices({ route, navigation, test_invoices=null, setAllInvoices=null }) {
    const { reload } = route.params || false;
    const [invoices, setInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setInvoices(await invoiceModel.getInvoices());
        route.params = false;
    }

    useEffect(async () => {
        setInvoices(await invoiceModel.getInvoices());
    }, []);

    const listOfInvoices = invoices
        .map((invoice: Invoice, index) => {
            return <DataTable.Row key={index}>
                        <DataTable.Cell style={styles.customer} onPress={() => navigation.navigate(
                                            'Visa faktura', {
                                            invoice: invoice
                                            })}>{invoice.name}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 2.5}}>{invoice.total_price}:-</DataTable.Cell>
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
            <TouchableOpacity
                style={Base.loginScreenButton}
                onPress={() => navigation.navigate('Skapa faktura')}
                >
                <Text style={Base.loginText}>Skapa faktura</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    customer: {
        flex: 11,
        color: 'blue'
    }
});
