import React from 'react'
import { Progress } from 'antd'

const Analytics = ({ allTransaction }) => {
    const categories = ["salary", "tip", "project", "food", "move", "bills", "fee", 'tax']
    // 1
    const totalTransaction = allTransaction.length;
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === "income")
    const totalExpanseTransaction = allTransaction.filter(transaction => transaction.type === "expanse")
    const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100
    const totalExpansePercent = (totalExpanseTransaction.length / totalTransaction) * 100
    // turnover
    const totalTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0)
    const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpanseTurnover = allTransaction.filter(transaction => transaction.type === "expanse").reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpanseTurnoverPercent = (totalExpanseTurnover / totalTurnover) * 100;



    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-start ">
                    <div className="">
                        <div className="card ">
                            <div className="card-header">Total Transaction : {totalTransaction}</div>
                            <div className="card-body">
                                <h5 className=''>Income :{totalIncomeTransaction.length}</h5>
                                <h5 className=''>Expanse :{totalExpanseTransaction.length}</h5>
                            </div>
                            <div className="mb-4">
                                <Progress type="circle" strokeColor={`green`} className='mx-2' percent={totalIncomePercent.toFixed()} />
                                <Progress type="circle" strokeColor={`red`} className='mx-2' percent={totalExpansePercent.toFixed()} />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="card mx-5">
                            <div className="card-header">Total Turnover: {totalTurnover}</div>
                            <div className="card-body">
                                <h5 className=''>Total Income :{totalIncomeTurnover}</h5>
                                <h5 className=''>Total Expanse :{totalExpanseTurnover}</h5>

                            </div>
                            <div className="mb-4">
                                <Progress type="circle" strokeColor={`green`} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed()} />
                                <Progress type="circle" strokeColor={`red`} className='mx-2' percent={totalExpanseTurnoverPercent.toFixed()} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start ">
                    <div className="mx-5">
                        <h4>Categorywise Income</h4>
                        {
                            categories.map((category) => {
                                const amount = allTransaction.filter((transaction) => transaction.type === "income" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    amount > 0 &&
                                    <div className="card  mb-3">
                                        <div className="card-body text-capitalize">
                                            <h5>{category}</h5>
                                            <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="">
                        <h4>Categorywise Expanse</h4>
                        {
                            categories.map((category) => {
                                const amount = allTransaction.filter((transaction) => transaction.type === "expanse" && transaction.category === category).reduce((acc, transaction) => acc + transaction.amount, 0);
                                return (
                                    amount > 0 &&
                                    <div className="card mb-3">
                                        <div className="card-body text-capitalize">
                                            <h5>{category}</h5>
                                            <Progress percent={((amount / totalExpanseTurnover) * 100).toFixed(0)} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div >
            </div>
        </>
    )
}

export default Analytics
