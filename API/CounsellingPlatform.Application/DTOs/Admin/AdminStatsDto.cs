namespace CounsellingPlatform.Application.DTOs.Admin;

public class AdminStatsDto
{
    public int TotalUsers { get; set; }
    public int TotalClients { get; set; }
    public int TotalCounsellors { get; set; }
    public int PendingApprovals { get; set; }
    public int ActiveCounsellors { get; set; }
    public int NewUsersThisMonth { get; set; }
}
