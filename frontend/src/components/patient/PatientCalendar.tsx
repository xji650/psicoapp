import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Video, Clock, MapPin, ChevronLeft, Bell, X, FileText, Target, TrendingUp } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface Appointment {
    id: string;
    title: string;
    date: Date;
    time: string;
    therapist?: string;
    type: 'session' | 'note' | 'reminder';
    location?: string;
    notes?: string;
}

const mockAppointments: Appointment[] = [
    {
        id: '1',
        title: 'Sesión con Dra. López',
        date: new Date(2025, 11, 9), // Mañana (December 9)
        time: '10:00 - 11:00',
        therapist: 'Dra. López',
        type: 'session',
        location: 'Videollamada',
    },
    {
        id: '2',
        title: 'Práctica de respiración',
        date: new Date(2025, 11, 10),
        time: '18:00',
        type: 'reminder',
        notes: 'Recordar hacer ejercicios de respiración',
    },
    {
        id: '3',
        title: 'Sesión con Dra. López',
        date: new Date(2025, 11, 12),
        time: '10:00 - 11:00',
        therapist: 'Dra. López',
        type: 'session',
        location: 'Consultorio - Sala 3',
    },
    {
        id: '4',
        title: 'Nota personal',
        date: new Date(2025, 11, 8),
        time: '14:30',
        type: 'note',
        notes: 'Me sentí muy bien hoy después de la meditación matutina',
    },
];

export function PatientCalendar() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: '',
        date: new Date(),
        startTime: '',
        endTime: '',
        type: 'note' as 'session' | 'note' | 'reminder',
        location: '',
        notes: '',
    });

    // Get appointments for selected date
    const selectedDateAppointments = selectedDate
        ? appointments.filter(
            (apt) =>
                apt.date.getDate() === selectedDate.getDate() &&
                apt.date.getMonth() === selectedDate.getMonth() &&
                apt.date.getFullYear() === selectedDate.getFullYear()
        )
        : [];

    // Get upcoming appointments (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    const upcomingAppointments = appointments
        .filter((apt) => apt.date >= today && apt.date <= nextWeek)
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    // Dates with appointments for calendar
    const datesWithAppointments = appointments.map((apt) => apt.date);

    const handleAddEntry = () => {
        const newAppointment: Appointment = {
            id: Date.now().toString(),
            title: newEntry.title,
            date: newEntry.date,
            time: `${newEntry.startTime} - ${newEntry.endTime}`,
            type: newEntry.type,
            location: newEntry.location,
            notes: newEntry.notes,
        };
        setAppointments([...appointments, newAppointment]);
        setIsDialogOpen(false);
        setNewEntry({
            title: '',
            date: new Date(),
            startTime: '',
            endTime: '',
            type: 'note',
            location: '',
            notes: '',
        });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'session':
                return 'from-blue-400 to-purple-500';
            case 'reminder':
                return 'from-amber-400 to-orange-500';
            case 'note':
                return 'from-green-400 to-emerald-500';
            default:
                return 'from-gray-400 to-gray-500';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'session':
                return Video;
            case 'reminder':
                return Bell;
            case 'note':
                return FileText;
            default:
                return CalendarIcon;
        }
    };

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className="pb-6 px-6 space-y-6">
            {/* Header */}
            <div className="pt-6">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl p-6 shadow-lg text-white">
                    <div className="flex items-center justify-between mb-2">
                        <h1>Mi Calendario</h1>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 hover:shadow-lg transition-all border border-white/30">
                                    <Plus className="w-5 h-5 mr-2" />
                                    Nueva entrada
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Agregar nueva entrada</DialogTitle>
                                    <DialogDescription>Organiza tus sesiones y recordatorios</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Título</Label>
                                        <Input
                                            id="title"
                                            placeholder="Ej: Recordar ejercicio de respiración"
                                            value={newEntry.title}
                                            onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">Tipo</Label>
                                        <select
                                            id="type"
                                            className="w-full px-3 py-2 bg-input-background rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={newEntry.type}
                                            onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value as any })}
                                        >
                                            <option value="note">Nota personal</option>
                                            <option value="reminder">Recordatorio</option>
                                            <option value="session">Sesión</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">Fecha</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={newEntry.date.toISOString().split('T')[0]}
                                            onChange={(e) => setNewEntry({ ...newEntry, date: new Date(e.target.value) })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-2">
                                            <Label htmlFor="startTime">Hora de inicio</Label>
                                            <Input
                                                id="startTime"
                                                type="time"
                                                value={newEntry.startTime}
                                                onChange={(e) => setNewEntry({ ...newEntry, startTime: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="endTime">Hora de fin</Label>
                                            <Input
                                                id="endTime"
                                                type="time"
                                                value={newEntry.endTime}
                                                onChange={(e) => setNewEntry({ ...newEntry, endTime: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="location">Ubicación (opcional)</Label>
                                        <Input
                                            id="location"
                                            placeholder="Ej: Videollamada"
                                            value={newEntry.location}
                                            onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notas (opcional)</Label>
                                        <Textarea
                                            id="notes"
                                            placeholder="Agrega detalles adicionales..."
                                            value={newEntry.notes}
                                            onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                                            rows={3}
                                        />
                                    </div>

                                    <Button
                                        onClick={handleAddEntry}
                                        disabled={!newEntry.title || !newEntry.startTime || !newEntry.endTime}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                    >
                                        Guardar entrada
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-sm opacity-90">
                        Organiza tus sesiones y recordatorios
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-6 shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl">{upcomingAppointments.length}</p>
                            <p className="text-sm opacity-90">Próximas citas</p>
                        </div>
                    </div>
                    <p className="text-xs opacity-75">En los próximos 7 días</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-6 shadow-lg text-white">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-2xl">{appointments.filter(apt => apt.type === 'session').length}</p>
                            <p className="text-sm opacity-90">Sesiones totales</p>
                        </div>
                    </div>
                    <p className="text-xs opacity-75">Programadas este mes</p>
                </div>
            </div>

            {/* Upcoming Sessions Card */}
            {upcomingAppointments.length > 0 && (
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 shadow-lg">
                    <h2 className="text-gray-900 mb-4">Próximas sesiones</h2>
                    <div className="space-y-3">
                        {upcomingAppointments.slice(0, 2).map((apt) => {
                            const TypeIcon = getTypeIcon(apt.type);
                            return (
                                <div key={apt.id} className="bg-white rounded-2xl p-4 flex items-center gap-4">
                                    <div className={`p-3 bg-gradient-to-br ${getTypeColor(apt.type)} rounded-xl flex-shrink-0`}>
                                        <TypeIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 truncate">{apt.title}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{apt.time}</span>
                                            {apt.location && (
                                                <>
                                                    <span>•</span>
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="truncate">{apt.location}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {apt.type === 'session' && (
                                        <Button className="bg-blue-600 text-white rounded-xl text-sm px-4 py-2 hover:bg-blue-700 flex-shrink-0">
                                            Unirse
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Calendar Section */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 shadow-lg">
                <h2 className="text-gray-900 mb-4">Calendario</h2>
                <div className="bg-white rounded-2xl p-4 shadow-sm max-w-md mx-auto">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-xl mx-auto flex justify-center"
                        classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-center",
                            month: "space-y-4 flex flex-col items-center",
                            caption: "flex justify-center pt-1 relative items-center w-full mb-2",
                            caption_label: "text-sm font-bold",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-7 w-0 bg-transparent p-0 opacity-50 hover:opacity-100",
                            nav_button_previous: "absolute left-0 top-1",
                            nav_button_next: "absolute right-0 top-1",
                            table: "w-full border-collapse space-y-1 mx-auto",
                            head_row: "flex justify-center",
                            head_cell: "text-gray-400 rounded-md w-9 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2 justify-center",
                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-100 rounded-lg transition-colors",
                            day_selected: "bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:bg-blue-600 focus:text-white",
                            day_today: "bg-blue-100 text-blue-900",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                        }}
                        modifiers={{
                            hasAppointment: datesWithAppointments,
                        }}
                        modifiersClassNames={{
                            hasAppointment: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-purple-500 after:rounded-full",
                        }}
                    />
                </div>
            </div>



            {/* Selected Date Appointments */}
            {selectedDate && (
                <div className="bg-white rounded-3xl p-6 shadow-lg">
                    <h2 className="text-gray-900 mb-4">
                        {formatDate(selectedDate)}
                    </h2>
                    {selectedDateAppointments.length > 0 ? (
                        <div className="space-y-3">
                            {selectedDateAppointments.map((apt) => {
                                const TypeIcon = getTypeIcon(apt.type);
                                return (
                                    <div
                                        key={apt.id}
                                        className={`bg-gradient-to-br ${getTypeColor(apt.type)} rounded-2xl p-4 text-white`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <TypeIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                                            <div className="flex-1">
                                                <p className="mb-1">{apt.title}</p>
                                                <div className="flex items-center gap-2 text-sm opacity-90">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{apt.time}</span>
                                                </div>
                                                {apt.therapist && (
                                                    <p className="text-sm opacity-90 mt-2">Con {apt.therapist}</p>
                                                )}
                                                {apt.location && (
                                                    <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{apt.location}</span>
                                                    </div>
                                                )}
                                                {apt.notes && (
                                                    <p className="text-sm opacity-90 mt-2 italic">{apt.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No hay eventos para este día</p>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                variant="ghost"
                                className="mt-3 text-blue-600 hover:text-blue-700"
                            >
                                Agregar entrada
                            </Button>
                        </div>
                    )}
                </div>
            )}

            {/* All Appointments List */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h2 className="text-gray-900 mb-4">Todas las entradas</h2>
                <div className="space-y-2">
                    {appointments
                        .sort((a, b) => b.date.getTime() - a.date.getTime())
                        .slice(0, 10)
                        .map((apt) => {
                            const TypeIcon = getTypeIcon(apt.type);
                            const isPast = apt.date < today;
                            return (
                                <div
                                    key={apt.id}
                                    className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all ${isPast ? 'opacity-60' : ''
                                        }`}
                                >
                                    <div className={`p-2 bg-gradient-to-br ${getTypeColor(apt.type)} rounded-lg`}>
                                        <TypeIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 truncate">{apt.title}</p>
                                        <p className="text-sm text-gray-600">
                                            {apt.date.toLocaleDateString('es-ES', {
                                                day: 'numeric',
                                                month: 'short'
                                            })} • {apt.time}
                                        </p>
                                    </div>
                                    {isPast && (
                                        <span className="text-xs text-gray-500 flex-shrink-0">Pasado</span>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}