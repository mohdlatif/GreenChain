import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  Datepicker,
  Textarea,
} from 'flowbite-react'
import { useState } from 'react'

import freighterApi from '@stellar/freighter-api'
const { isConnected } = await freighterApi.isConnected()
const { address } = await freighterApi.getAddress()

export function Form() {
  const [showOtherInput, setShowOtherInput] = useState(false)
  const [selectedAction, setSelectedAction] = useState('')

  const handleActionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowOtherInput(event.target.value === 'Other')
    setSelectedAction(event.target.value)
  }
  if (address == '') console.log('Please connect to your wallet')

  const impactEstimates: Record<
    string,
    { per: string; unit: string; value: number }
  > = {
    carpooling: { per: 'person per 10 km', unit: 'kg CO2', value: 1.5 },
    composting: { per: 'kg of food waste', unit: 'kg CO2', value: 0.9 },
    cycling: { per: 'km', unit: 'kg CO2', value: 0.2 },
    eco_friendly_cleaning: {
      per: 'cleaning session',
      unit: 'kg CO2',
      value: 0.3,
    },
    electronic_recycling: { per: 'device', unit: 'kg CO2', value: 20 },
    energy_conservation: { per: 'kWh saved', unit: 'kg CO2', value: 0.5 },
    led_bulb_switch: { per: 'bulb per day', unit: 'kg CO2', value: 0.3 },
    paperless_billing: { per: 'statement', unit: 'kg CO2', value: 0.2 },
    plant_based_meal: { per: 'meal', unit: 'kg CO2', value: 1.5 },
    public_transport: { per: '10 km trip', unit: 'kg CO2', value: 2.5 },
    recycling: { per: 'kg of mixed recycling', unit: 'kg CO2', value: 1.5 },
    renewable_energy: { per: 'kWh generated', unit: 'kg CO2', value: 0.5 },
    reusable_bag: { per: 'use', unit: 'kg CO2', value: 0.1 },
    smart_thermostat: { per: 'day', unit: 'kg CO2', value: 0.7 },
    telecommuting: { per: 'day', unit: 'kg CO2', value: 3.2 },
    thrift_shopping: { per: 'clothing item', unit: 'kg CO2', value: 5.7 },
    tree_planting: { per: 'tree per year', unit: 'kg CO2', value: 22 },
    water_conservation: {
      per: '1000 liters saved',
      unit: 'kg CO2',
      value: 0.3,
    },
    zero_waste_shopping: { per: 'shopping trip', unit: 'kg CO2', value: 0.5 },
  }

  return (
    <div className="flex w-full justify-center rounded-sm bg-white px-6 py-4">
      <form className="flex w-full max-w-md flex-col gap-4">
        <div>
          <div className="mb-1 block text-left">
            <Label
              htmlFor="actions"
              value="Choose the category that best describes your action"
            />
          </div>
          <Select id="actions" onChange={handleActionChange} required>
            <option value="recycling">Recycling</option>
            <option value="public_transport">Using Public Transport</option>
            <option value="energy_conservation">Energy Conservation</option>
            <option value="water_conservation">Water Conservation</option>
            <option value="composting">Composting</option>
            <option value="reusable_bag">Using Reusable Bags</option>
            <option value="carpooling">Carpooling</option>
            <option value="cycling">Cycling Instead of Driving</option>
            <option value="tree_planting">Planting Trees</option>
            <option value="renewable_energy">Using Renewable Energy</option>
            <option value="zero_waste_shopping">Reducing Plastic Usage</option>
            <option>Other</option>
          </Select>

          <p className="px-1 text-left text-sm text-neutral-500">
            {selectedAction && impactEstimates[selectedAction]
              ? `Estimated impact: ${impactEstimates[selectedAction].value} ${impactEstimates[selectedAction].unit} per ${impactEstimates[selectedAction].per}`
              : 'Select an action to see the estimated impact.'}
          </p>
          {showOtherInput && (
            <div id="other">
              <div className="mb-1 block text-left">
                <Label htmlFor="other" value="Type of Action" />
              </div>
              <TextInput
                id="other"
                type="text"
                placeholder="Something amazing you did"
              />
            </div>
          )}
        </div>

        <div>
          <div className="mb-1 block text-left">
            <Label
              htmlFor="date"
              value="When did you perform this sustainable action?"
            />
          </div>
          <Datepicker id="date" title="Date of Action" />
        </div>

        <div>
          <div className="block text-left">
            <Label htmlFor="note" value="Additional Notes" />
          </div>
          <Textarea id="note" rows={4} />
        </div>

        <Button className="mt-4" type="submit">
          Log My Action
        </Button>
      </form>
    </div>
  )
}
