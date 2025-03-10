
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useIntersectionObserver } from '@/lib/animations';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Check, 
  Loader2
} from 'lucide-react';

// Form schema validation
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez saisir une adresse e-mail valide.",
  }),
  phone: z.string().min(10, {
    message: "Veuillez saisir un numéro de téléphone valide.",
  }),
  birthDate: z.string().min(1, {
    message: "La date de naissance est requise.",
  }),
  event: z.string().min(1, {
    message: "Veuillez sélectionner un événement.",
  }),
});

const RegistrationForm = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useIntersectionObserver();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
      event: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Form values:', values);
    
    toast({
      title: "Inscription réussie!",
      description: "Votre demande d'inscription a été soumise avec succès.",
    });
    
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "w-full max-w-md mx-auto glass rounded-2xl p-8 shadow-sm transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Formulaire d'inscription</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Jean" 
                        className="pl-10 bg-white/50" 
                        {...field} 
                      />
                      <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Dupont" 
                        className="pl-10 bg-white/50" 
                        {...field} 
                      />
                      <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="jean.dupont@example.com" 
                      type="email" 
                      className="pl-10 bg-white/50" 
                      {...field} 
                    />
                    <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="06 12 34 56 78" 
                      className="pl-10 bg-white/50" 
                      {...field} 
                    />
                    <Phone className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="date" 
                      className="pl-10 bg-white/50" 
                      {...field} 
                    />
                    <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Événement</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/50">
                      <SelectValue placeholder="Sélectionnez un événement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="conference">Conférence annuelle</SelectItem>
                    <SelectItem value="workshop">Atelier de formation</SelectItem>
                    <SelectItem value="seminar">Séminaire professionnel</SelectItem>
                    <SelectItem value="exhibition">Salon d'exposition</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6 group" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            )}
            {isSubmitting ? "Traitement en cours..." : "Soumettre l'inscription"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
