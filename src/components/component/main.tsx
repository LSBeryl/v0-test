"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

function formatDate(date:Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function Main() {
  const [menu, setMenu] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
    error: '',
  })
  const [date, setDate] = useState(formatDate(new Date()))

  useEffect(() => {
    fetch(`https://api.디미고급식.com/?date=${date}`)
    .then(res => res.json())
    .then(data => {
      setMenu(data)
    })
  }, [date])
  
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 font-sans">학교 급식</h1>
            <p className="text-gray-500 font-sans">OO고등학교 급식 메뉴를 확인해보세요.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 font-sans">날짜 선택</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="px-4 py-2 rounded-md font-medium text-gray-700 dark:text-gray-300">
                <Input className="bg-transparent focus:outline-none font-sans" type="date" onInput={(e:any) => setDate(e.target.value)} value={date} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 font-sans">오늘의 급식</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">아침</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 font-sans">
                    {menu.breakfast ? menu.breakfast.split('/').map((menuData:string) => (
                      <li>{menuData}</li>
                    )) : <li>데이터가 없습니다.</li>}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">점심</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 font-sans">
                    {menu.lunch ? menu.lunch.split('/').map((menuData:string) => (
                      <li>{menuData}</li>
                    )) : <li>데이터가 없습니다.</li>}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">저녁</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 font-sans">
                    {menu.dinner ? menu.dinner.split('/').map((menuData:string) => (
                      <li>{menuData}</li>
                    )) : <li>데이터가 없습니다.</li>}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
