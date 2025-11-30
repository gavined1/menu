import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { T } from '@/components/ui/Typography';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <T.H1>Dashboard</T.H1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to your dashboard. This is your central hub for managing
            your digital menus.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
