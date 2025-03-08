import { default as ServiceBase } from "./service.base";


class TransactionsService extends ServiceBase {
    constructor() {
        super('user')
    }
    postCreateTransaction(payload) {
        return this.post("/transactions", payload)
    }
    putTransactionById(id, payload) {
        return this.put(`/transactions/${id}`, payload)
    }
    deleteTransactionById(id) {
        return this.delete(`/transactions/${id}`)
    }
    getStatusPaymentById(paymentId) {
        return this.get(`/payment/status/${paymentId}`)
    }
    getAllTransactions() {
        return this.get("/transactions")
    }
    getTransactionsById(id) {
        return this.get(`/transactions/${id}`)
    }
    getTransactionsSummary() {
        return this.get("/transactions/products/summary")
    }
    getTransactionsByDay(date) {
        return this.get(`/transactions/day/${date}`)
    }
    getTransactionsByMonth(year, month) {
        return this.get(`/transactions/month/${year}/${month}`)
    }
    getTransactionsByWeek(startOfWeek) {
        return this.get(`/transactions/week/${startOfWeek}`)
    }
    getTransactionsByYear(year) {
        return this.get(`/transactions/year/${year}`)
    }
    getTransactionsBalanceByDate(date) {
       return this.get(`/transactions/balance/${date}`)
    }
    getTransactionsBalanceHistory() {
       return this.get(`/transactions/balance/history`)
    }
    getTransactionsDailyTotals() {
       return this.get(`/transactions/daily-totals`)
    }
    getTransactionsTotalsByCategory() {
       return this.get(`/transactions/totals-by-category`)
    }
    getTransactionsTotalsByPaymentMethod() {
       return this.get(`/transactions/total-by-payment-method`)
    }
    getTransactionsByDateRange(payload) {
        return this.get("/transactions/date-range", payload)
    }
    getTransactionsChartData() {
        return this.get("/transactions/chart-data")
    }


}



export default TransactionsService