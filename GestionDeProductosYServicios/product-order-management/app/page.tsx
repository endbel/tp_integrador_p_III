import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">Product & Order Management</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Streamline your business operations with our comprehensive management platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-slate-800">Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Efficiently manage your product catalog with advanced features
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <ShoppingCart className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-slate-800">Order Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Track and manage orders from placement to delivery
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-slate-800">Customer Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Maintain detailed customer profiles and relationships
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-slate-800">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get insights with comprehensive reporting and analytics
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
