import { FaExclamation, FaCheck } from "react-icons/fa";
import { NOTIFICATIONS_QUERY_KEY, notificationService } from "../../services/notification.service";
import type { UserNotificationData } from "../../utils/notificationData";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { connectNotificationsSocket } from "../../services/socket";
import { userStore } from "../../features/store/user.store";


export default function NotificationsPage() {
  const {
    data: notifications = [],
    isLoading,
    error,
  } = notificationService.getAllNotifByUser();

  const queryClient = useQueryClient();
  const { access_token } = userStore(); // adapte à ton auth

  useEffect(() => {
    if (!access_token) return;

    const socket = connectNotificationsSocket(access_token);

    socket.on("notification:new", (notif: UserNotificationData) => {
      // on met à jour le cache des notifs
      queryClient.setQueryData<UserNotificationData[]>(
        NOTIFICATIONS_QUERY_KEY,
        (old = []) => [notif, ...old]
      );
    });

    return () => {
      socket.off("notification:new");
    };
  }, [access_token, queryClient]);
  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-[#3C3344] flex items-center justify-center">
        <p className="text-white text-lg">Chargement des notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-screen bg-[#3C3344] flex items-center justify-center">
        <p className="text-red-300 text-lg">
          Erreur lors du chargement des notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[#3C3344] flex flex-col items-center pt-20">
      <h1 className="text-white text-4xl md:text-5xl font-bold mt-10 mb-6 text-center">
        Mes notifications
      </h1>

      <div className="bg-white shadow-lg rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 md:p-8">
        {notifications.map((notif: UserNotificationData) => (
          <div
            key={notif.id}
            className="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
          >
            {/* Icône vue / non vue */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                notif.seen ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {notif.seen ? (
                <FaCheck className="text-white text-lg" />
              ) : (
                <FaExclamation className="text-white text-lg" />
              )}
            </div>

            <div className="flex-1">
              {/* Message principal */}
              <p className="text-gray-800 font-medium">{notif.message}</p>


              {/* Détail selon le type de data */}
              {notif.data?.kind === "HAPPENNING" && (
                <div className="mt-2 text-xs text-gray-600">
                  <p className="font-semibold">
                    {notif.data.title}
                  </p>
                  <p>{notif.data.content}</p>
                  <p className="mt-1">
                    Du{" "}
                    {new Date(
                      notif.data.dateStart
                    ).toLocaleDateString("fr-FR")}{" "}
                    au{" "}
                    {new Date(
                      notif.data.dateEnd
                    ).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              )}

              {notif.data?.kind === "ACTIVITY" && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>
                    Activité validée le{" "}
                    {new Date(
                      notif.data.validatedAt
                    ).toLocaleDateString("fr-FR")}{" "}
                    ({notif.data.moment})
                  </p>
                  <p className="mt-1">
                    Classe : {notif.data.classId}
                    <br />
                    Planning : {notif.data.planningId}
                  </p>
                  {(notif.data.activityId || notif.data.outingId) && (
                    <p className="mt-1">
                      {notif.data.activityId &&
                        `Activité ID : ${notif.data.activityId}`}
                      {notif.data.activityId && notif.data.outingId && " — "}
                      {notif.data.outingId &&
                        `Sortie ID : ${notif.data.outingId}`}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Aucune notification pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
