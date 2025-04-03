'use client'

import { useState } from "react"
import { CardHeader, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { IconArrowDown, IconGlobe } from "@tabler/icons-react"
type Ranking = {
  name: string;
  score: number;
  region: string;
}

export default function Rankings() {
  const [selectedRegion, setSelectedRegion] = useState<string>("india")
  const [sortColumn, setSortColumn] = useState<keyof Ranking>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const rankings: Ranking[] = [
    { name: "Naveen Kumar", score: 1000, region: "mohali" },
    { name: "Rohit Yadav", score: 1950, region: "chandigarh" },
    { name: "Ashit Rai", score: 900, region: "chandigarh" },
    { name: "Riddhi Dhingra", score: 1200, region: "chandigarh" },
    { name: "Kapil Gangwar", score: 1150, region: "chandigarh" },
    { name: "Dev Patel", score: 1100, region: "chandigarh" },
    { name: "Prashant", score: 1300, region: "mohali" },
    { name: "Gungun", score: 1050, region: "mohali" },
    { name: "Rithik Yadav", score: 1200, region: "mohali" },
    { name: "Aryan Yadav", score: 1150, region: "mohali" },
  ]

  const filteredRankings = rankings.filter(
    (ranking) => ranking.region === selectedRegion || selectedRegion === "india",
  )

  const sortedRankings = filteredRankings.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const rankedRankings = sortedRankings.map((ranking, index) => ({
    rank: index + 1,
    ...ranking
  }))

  const handleSortColumn = (column: keyof Ranking) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  return (
    <div className="w-full">
      <CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0 capitalize">
              <IconGlobe className="w-4 h-4 mr-2" />
              {selectedRegion === "india" ? "India" : selectedRegion}
              <IconArrowDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedRegion("india")}>India</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRegion("chandigarh")}>Chandigarh</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedRegion("mohali")}>Mohali</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSortColumn("name")}>
                Name{" "}
                {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSortColumn("score")}>
                Score{" "}
                {sortColumn === "score" && (
                  <span className="ml-1">{sortDirection === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rankedRankings.map((ranking) => (
              <TableRow key={`${ranking.region}-${ranking.name}`}>
                <TableCell>{ranking.rank}</TableCell>
                <TableCell>{ranking.name}</TableCell>
                <TableCell className="text-right">{ranking.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  )
}