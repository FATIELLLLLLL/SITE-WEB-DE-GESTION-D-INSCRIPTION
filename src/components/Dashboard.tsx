
import React, { useState } from 'react';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Search,
  UserPlus,
  Users,
  Calendar,
  BarChart3,
  Download,
  Filter,
  PlusCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data for the dashboard
const mockParticipants = [
  { id: 1, name: 'Sophie Martin', email: 'sophie.martin@example.com', event: 'Conférence annuelle', status: 'Confirmé', date: '2023-05-15' },
  { id: 2, name: 'Thomas Bernard', email: 'thomas.b@example.com', event: 'Atelier de formation', status: 'En attente', date: '2023-05-17' },
  { id: 3, name: 'Emilie Dubois', email: 'emilie.d@example.com', event: 'Séminaire professionnel', status: 'Confirmé', date: '2023-05-20' },
  { id: 4, name: 'Lucas Leroy', email: 'lucas.l@example.com', event: 'Salon d\'exposition', status: 'Annulé', date: '2023-05-22' },
  { id: 5, name: 'Camille Petit', email: 'camille.p@example.com', event: 'Conférence annuelle', status: 'Confirmé', date: '2023-05-25' },
  { id: 6, name: 'Antoine Durand', email: 'antoine.d@example.com', event: 'Atelier de formation', status: 'En attente', date: '2023-05-28' },
];

// Stats data for the overview cards
const statsData = [
  { title: 'Inscrits', value: '124', icon: Users, color: 'bg-blue-50 text-blue-500' },
  { title: 'Événements', value: '8', icon: Calendar, color: 'bg-green-50 text-green-500' },
  { title: 'Taux de conversion', value: '68%', icon: BarChart3, color: 'bg-purple-50 text-purple-500' },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, isVisible } = useIntersectionObserver();
  
  // Filter participants based on search term
  const filteredParticipants = mockParticipants.filter(participant => 
    participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge styles
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmé':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> {status}</span>;
      case 'En attente':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" /> {status}</span>;
      case 'Annulé':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> {status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "w-full transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <Tabs defaultValue="participants" className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <TabsList className="glass">
            <TabsTrigger value="participants" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Événements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass">
              <Filter className="h-4 w-4 mr-2" />
              Filtrer
            </Button>
            <Button variant="outline" size="sm" className="glass">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="glass border-white/20">
                <CardContent className="p-6 flex items-center">
                  <div className={cn("p-3 rounded-lg mr-4", stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <TabsContent value="participants" className="mt-0">
          <Card className="glass border-white/20">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Liste des participants</CardTitle>
                  <CardDescription>
                    Gérez tous les participants inscrits aux événements.
                  </CardDescription>
                </div>
                
                <div className="w-full sm:w-auto flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-9 bg-white/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nouveau
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Événement</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((participant) => (
                        <TableRow key={participant.id} className="hover:bg-white/10">
                          <TableCell className="font-medium">{participant.name}</TableCell>
                          <TableCell>{participant.email}</TableCell>
                          <TableCell>{participant.event}</TableCell>
                          <TableCell>{getStatusBadge(participant.status)}</TableCell>
                          <TableCell>{participant.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Voir
                              </Button>
                              <Button variant="ghost" size="sm">
                                Éditer
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                          Aucun résultat trouvé. Veuillez modifier votre recherche.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-0">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Gestion des événements</CardTitle>
              <CardDescription>
                Créez et gérez tous vos événements à venir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-lg font-medium mb-2">Contenu en cours de développement</h3>
                <p>La gestion des événements sera disponible dans une prochaine mise à jour.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats" className="mt-0">
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Statistiques et analytics</CardTitle>
              <CardDescription>
                Visualisez les tendances et performances de vos inscriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-lg font-medium mb-2">Contenu en cours de développement</h3>
                <p>Les statistiques détaillées seront disponibles dans une prochaine mise à jour.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Import the missing Clock icon
const Clock = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Dashboard;
