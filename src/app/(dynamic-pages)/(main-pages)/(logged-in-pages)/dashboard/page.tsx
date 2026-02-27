import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { T } from '@/components/ui/Typography';
import { getUserMenuClients } from '@/rsc-data/menu/queries';
import Link from 'next/link';

export default async function DashboardPage() {
  const menus = await getUserMenuClients();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
      <T.H1>Your Menus</T.H1>

      {menus.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No menus yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You don&apos;t have any menus assigned to your account yet. Once
              a menu is created and you are added as a member, it will appear
              here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <Card key={menu.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span className="truncate">{menu.name}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize">
                    {menu.member_role}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {menu.description || 'No description provided.'}
                </p>
                <div className="mt-auto flex items-center justify-between pt-2 text-sm">
                  <span className="text-muted-foreground">
                    Slug: <code>{menu.slug}</code>
                  </span>
                  <Link
                    href={`/${menu.slug}`}
                    className="text-primary hover:underline"
                  >
                    View menu
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
