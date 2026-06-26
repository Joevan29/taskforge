namespace TaskForge.Domain.Enums;

public enum UserRole { Owner, Admin, Member, Viewer }
public enum TaskPriority { Low, Medium, High, Urgent }
public enum ProjectStatus { Active, OnHold, Done, Archived }
public enum NotificationType { TaskAssigned, TaskCommented, TaskMoved, TaskDue, MemberInvited, SystemAlert }
