import { FormEvent } from "react";
import { WhiteCard } from "../../components";
import { useWeddingBoundStore } from "../../stores";

export const WeddingInvitationPage = () => {

  const firstName = useWeddingBoundStore(state => state.firstName)
  const lastName = useWeddingBoundStore(state => state.lastName)

  const setFirstName = useWeddingBoundStore(state => state.setFirstName)
  const setLastName = useWeddingBoundStore(state => state.setLastName)

  const guestCount = useWeddingBoundStore(state => state.guestCount)
  const setGuestCount = useWeddingBoundStore(state => state.setGuestCount)

  const eventHHMM = useWeddingBoundStore(state => state.eventHHMM())
  const eventYYYYMMDD = useWeddingBoundStore(state => state.eventYYYYMMDD())

  const setEventDate = useWeddingBoundStore(state => state.setEventDate)
  const setEventTime = useWeddingBoundStore(state => state.setEventTime)


  const isConfirmed = useWeddingBoundStore(state => state.isConfirmed)
  const setIsConfirmend = useWeddingBoundStore(state => state.setIsConfirmend)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({firstName, lastName, guestCount, eventHHMM, eventYYYYMMDD, isConfirmed});
  }


  return (
    <>
      <h1>Invitación de Boda</h1>
      <p>Zustand segmentado en slices</p>
      <hr />

      <WhiteCard className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={(e)=>onSubmit(e)}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Primer Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Primer Nombre"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Cuántos invitados traerá?
              </label>
              <input
                value={guestCount}
                onChange={(e)=>setGuestCount(Number(e.target.value))}
                type="number"
                name="guestNumber"
                id="guestNumber"
                min="0"
                //placeholder="5"
                className="w-full appearance-none rounded-md border border-[#0d0c0c] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Fecha de evento
                  </label>
                  <input type="date" name="eventDate" id="eventDate" value={eventYYYYMMDD} onChange={(e)=>setEventDate(e.target.value)}/>
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Hora del evento
                  </label>
                  <input type="time" name="eventTime" id="eventTime" value={eventHHMM} onChange={(e)=>setEventTime(e.target.value)}/>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                ¿Tu también vendrás?
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton1"
                    className="h-5 w-5"
                    checked={isConfirmed}
                    onChange={()=> setIsConfirmend(true)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    Si
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isComing"
                    id="radioButton2"
                    className="h-5 w-5"
                    checked={!isConfirmed}
                    onChange={()=> setIsConfirmend(false)}
                  />
                  <label className="pl-3 text-base font-medium text-[#07074D]">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button>Enviar</button>
            </div>
          </form>
        </div>
      </WhiteCard>
    </>
  );
};
