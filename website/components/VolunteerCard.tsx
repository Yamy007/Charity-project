import { Button } from './ui/Button'
import { Card } from './ui/Card'

interface VolunteerCardI {
    name: string
    serviceName: string
}

const VolunteerCard: React.FC<VolunteerCardI> = ({ name, serviceName }) => {
    return (
        <Card className="p-3 flex justify-between items-center">
            <div className="flex flex-col justify-between">
                <p className="text-lg font-bold">{name}</p>
                <p>{serviceName}</p>
            </div>
            <div className="flex gap-3">
                <Button
                    className="border-green-400 hover:bg-green-400 hover:text-white"
                    variant="outline"
                >
                    Approve
                </Button>
                <Button
                    className="border-red-400 hover:bg-red-400 hover:text-white"
                    variant="outline"
                >
                    Decline
                </Button>
            </div>
        </Card>
    )
}

export default VolunteerCard
